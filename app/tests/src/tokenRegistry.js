import {TokenRegistry} from '../../frontend/tokenRegistry/tokenRegistry'
import assert from 'assert'

describe('Token registry api', () => {
  it('parse', () => {
    const wmtMetadata = {
      subject:
        '1d7f33bd23d85e1a25d87d86fac4f199c3197a2f7afeb662a0f34e1e776f726c646d6f62696c65746f6b656e',
      url: {
        sequenceNumber: 0,
        value: 'https://worldmobiletoken.com',
        signatures: [
          {
            signature:
              'd0af041b579c3a1e0ca832a28604c950fd7e339fe0e009cfd80a2473a4e3e3d7644521de41444bdc88c52b623e82bd47ccf3a8d94952a4b05f987d8846bb1201',
            publicKey: 'd04a3088839559b64b290ce5c033cbd5f2aa23fc49aa533f9c57385e98d0ca38',
          },
          {
            signature:
              '7c4ec5fa7bb25ee919ca16a77a2020b7a2374e16e2c2c8ece6df76f17bc5f2f9bec10a61a871b1bf18d2c9237521cd788d49d464956db6e24c88f3709cacad08',
            publicKey: 'bb0d471619d5f859eb43a973356ad6f873e87065c297208bead6aeeb134d6980',
          },
        ],
      },
      name: {
        sequenceNumber: 0,
        value: 'World Mobile Token',
        signatures: [
          {
            signature:
              'cd239ee7f52685b4a088e7de56173fab610ff1e1f90764f97c4aea02a1088d3bf95227ccd1191aedaf1ae6ada7554318c746d73c83f015a44f101ae0d6af6b07',
            publicKey: 'd04a3088839559b64b290ce5c033cbd5f2aa23fc49aa533f9c57385e98d0ca38',
          },
          {
            signature:
              '882f8794646bd0158a461fe7f0a0bf7c50e9e96c8b1fa9cb81abd192c647a0a37d0b25bfb74da40263365848f7f1d7f0d3778579bd864ef357699d72a2ce1e0a',
            publicKey: 'bb0d471619d5f859eb43a973356ad6f873e87065c297208bead6aeeb134d6980',
          },
        ],
      },
      ticker: {
        sequenceNumber: 0,
        value: 'WMT',
        signatures: [
          {
            signature:
              'dfc7093a8a950c3e9af493eaed05c7e8c5b7d868d51346a926604f42cf1c159bfb8f3c52a0f2b76db1bad889a812aad8b12e80193b949df673f69a5a8794870c',
            publicKey: 'd04a3088839559b64b290ce5c033cbd5f2aa23fc49aa533f9c57385e98d0ca38',
          },
          {
            signature:
              '7a2b9864308553b1c1546353480e036d862861a0aa87046a3a8e02831782fd559cc52bc7471f7ea68266093faf2606a4d926c0e04ed358cf82bea0a9fda8e104',
            publicKey: 'bb0d471619d5f859eb43a973356ad6f873e87065c297208bead6aeeb134d6980',
          },
        ],
      },
      decimals: {
        sequenceNumber: 0,
        value: 6,
        signatures: [
          {
            signature:
              '8bc167b8724fabbf822ac976f9444a391609419648036e5f788b797b4a76fc1cdfc39411c823cabc6e0cd36746d2026257d85f3b951bf6c2cf2e45c630aba204',
            publicKey: 'd04a3088839559b64b290ce5c033cbd5f2aa23fc49aa533f9c57385e98d0ca38',
          },
          {
            signature:
              '9714556833ee041bc8ed9b0a6835206e7eaa749d8c886afdff2c517f3e0449e01a38accd715d0962c8ac00026748e6c38635957cfc63c76e06ef406890f98e04',
            publicKey: 'bb0d471619d5f859eb43a973356ad6f873e87065c297208bead6aeeb134d6980',
          },
        ],
      },
      policy:
        '82018201838200581c1423d22ea96d09b88162b1b7a9a88df1bfc2aec37cd805428d6a0d338200581c4c0b87c21190ad6f6144d0609761a8af515efd3fabcc8d929d63e9e382051a01ff3fe5',
      logo: {
        sequenceNumber: 0,
        value:
          'iVBORw0KGgoAAAANSUhEUgAAAKcAAACnCAYAAAB0FkzsAAAACXBIWXMAAC4jAAAuIwF4pT92AAAF92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDYtMjlUMTM6MjU6MzQrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMDYtMjlUMTM6MjU6MzQrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA2LTI5VDEzOjI1OjM0KzAyOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE2ZGM2ZjZjLTYyY2MtNDRlNC1iNzE1LWVkNGE0YjI2OWExMiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjkxZjc0ODc0LTUzYjEtNzk0Ny05NDc5LWVkZGU2MWIwNmEzMiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjg2YTgzNDVhLWMxYTgtNDVhOS04ZDU5LTBmYjIzZDRhNTlmMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODZhODM0NWEtYzFhOC00NWE5LThkNTktMGZiMjNkNGE1OWYwIiBzdEV2dDp3aGVuPSIyMDIxLTA2LTI5VDEzOjI1OjM0KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTZkYzZmNmMtNjJjYy00NGU0LWI3MTUtZWQ0YTRiMjY5YTEyIiBzdEV2dDp3aGVuPSIyMDIxLTA2LTI5VDEzOjI1OjM0KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4SNMMYAAAnu0lEQVR4nO2deZxcZZnvv7/3nKrqPZ1OSMJqgEjYAklA2YKERREE4Tpu9+p4x9nU0fE6jnMdR++gzlxmZNzGGXWuC+DoqLihjojDorJDwA9LEpYkkAUIS/beu6rO+9w/zqleku6k+1RVV3envvm8kFTVed+n6vzO8+7Pq4fb30vFMYMoAtnQa17gHISN4Avg+8BlQSH4fnAN8etxBoBADqwA5sBlkteLmAnJMBMoQAiiIpCP8zHABkAaNEdK8nQNYHnwHjzggCCH+QJY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',
        signatures: [
          {
            signature:
              'e0ae9a6c6cb5cfdca208751db6de351f99a5d1819c38130db18c34d558fc5d3dfcf4264a50f655cab528e7b612d1108bee2950d6448f2ccaae0f3eafddd9a408',
            publicKey: 'd04a3088839559b64b290ce5c033cbd5f2aa23fc49aa533f9c57385e98d0ca38',
          },
          {
            signature:
              '95a7fd841ce6fbc57276e3e8d4e95a1ef9ccf0181cf55f940136dc7dac96eaaf935115b739c015725c256e32feaeb1fa0e6fa28bf680a13c76ffebf023c80f0c',
            publicKey: 'bb0d471619d5f859eb43a973356ad6f873e87065c297208bead6aeeb134d6980',
          },
        ],
      },
      description: {
        sequenceNumber: 0,
        value:
          'WMT is a utility token created to connect the unconnected and bank the unbanked. With nearly 4 billion people left offline, digital exclusion is a significant problem. Together with Input Output, World Mobile will deliver a revolutionary, scalable network in Africa and beyond. Let’s kickstart the sharing economy, reboot telecoms, and open a new world!',
        signatures: [
          {
            signature:
              'b58ad9f7407fbfc4980c7a1322853764fa1fff6eac94e8a17e22fd868faeb239119fe1a944055ad786d9bc0cd2230d4706a055cbaeeb83531b52eef1ae13c209',
            publicKey: 'd04a3088839559b64b290ce5c033cbd5f2aa23fc49aa533f9c57385e98d0ca38',
          },
          {
            signature:
              'dab9d110d20ef1a39d88afbebd2f352b7e7d439758a3c466277850307d9a938f0abff01a4ac2838a2138d067c2f1dcf78ed4e0d957280a76e6b826e455cf800c',
            publicKey: 'bb0d471619d5f859eb43a973356ad6f873e87065c297208bead6aeeb134d6980',
          },
        ],
      },
    }

    const expected = new Map(
      Object.entries({
        '1d7f33bd23d85e1a25d87d86fac4f199c3197a2f7afeb662a0f34e1e776f726c646d6f62696c65746f6b656e': {
          subject:
            '1d7f33bd23d85e1a25d87d86fac4f199c3197a2f7afeb662a0f34e1e776f726c646d6f62696c65746f6b656e',
          description:
            'WMT is a utility token created to connect the unconnected and bank the unbanked. With nearly 4 billion people left offline, digital exclusion is a significant problem. Together with Input Output, World Mobile will deliver a revolutionary, scalable network in Africa and beyond. Let’s kickstart the sharing economy, reboot telecoms, and open a new world!',
          ticker: 'WMT',
          url: 'https://worldmobiletoken.com',
          logoBase64:
            'iVBORw0KGgoAAAANSUhEUgAAAKcAAACnCAYAAAB0FkzsAAAACXBIWXMAAC4jAAAuIwF4pT92AAAF92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMDYtMjlUMTM6MjU6MzQrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjEtMDYtMjlUMTM6MjU6MzQrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIxLTA2LTI5VDEzOjI1OjM0KzAyOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE2ZGM2ZjZjLTYyY2MtNDRlNC1iNzE1LWVkNGE0YjI2OWExMiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjkxZjc0ODc0LTUzYjEtNzk0Ny05NDc5LWVkZGU2MWIwNmEzMiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjg2YTgzNDVhLWMxYTgtNDVhOS04ZDU5LTBmYjIzZDRhNTlmMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ODZhODM0NWEtYzFhOC00NWE5LThkNTktMGZiMjNkNGE1OWYwIiBzdEV2dDp3aGVuPSIyMDIxLTA2LTI5VDEzOjI1OjM0KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTZkYzZmNmMtNjJjYy00NGU0LWI3MTUtZWQ0YTRiMjY5YTEyIiBzdEV2dDp3aGVuPSIyMDIxLTA2LTI5VDEzOjI1OjM0KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4SNMMYAAAnu0lEQVR4nO2deZxcZZnvv7/3nKrqPZ1OSMJqgEjYAklA2YKERREE4Tpu9+p4x9nU0fE6jnMdR++gzlxmZNzGGXWuC+DoqLihjojDorJDwA9LEpYkkAUIS/beu6rO+9w/zqleku6k+1RVV3envvm8kFTVed+n6vzO8+7Pq4fb30vFMYMoAtnQa17gHISN4Avg+8BlQSH4fnAN8etxBoBADqwA5sBlkteLmAnJMBMoQAiiIpCP8zHABkAaNEdK8nQNYHnwHjzggCCH+QJY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',
          decimals: 6,
        },
      })
    )
    const actual = new TokenRegistry().parseTokensMetadata({Right: [wmtMetadata]})

    assert.deepStrictEqual(expected, actual)
  }).timeout(5000)
})
